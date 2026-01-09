const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  let type = req.query.type;

  if (type) {
    const allListings = await Listing.find({ category: type });
    let t = 1;
    if (allListings.length == 0) {
      req.flash("error", `No Listing found related to ${type}`);
      return res.redirect("/listings");
    }
    res.render("./listings/index.ejs", { allListings, type, t });
  } else {
    let t = 0;

    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings, t });
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listings you requested for does not exist!");
    res.redirect("/listings");
  } else res.render("./listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.geometry = response.body.features[0].geometry;

  newListing.image.url = url;
  newListing.image.filename = filename;
  let saved = await newListing.save();

  console.log(saved);
  req.flash("success", "New Listing Created!");

  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listings you requested for does not exist!");
    return res.redirect("/listings");
  }

  let orgImage = listing.image.url;
  orgImage = orgImage.replace("/upload", "/upload/w_250");

  res.render("./listings/edit.ejs", { listing, orgImage });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;

    listing.image.url = url;
    listing.image.filename = filename;
    await listing.save();
  }

  req.flash("success", "Listing Updated!");

  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;

  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing Deleted!");

  res.redirect("/listings");
};