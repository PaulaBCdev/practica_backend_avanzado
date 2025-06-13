export function changeLocale(req, res, next) {
  const locale = req.params.locale;

  // set cookie to response
  res.cookie("nodeapp-locale", locale, {
    maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
  });

  //redirect to same page
  res.redirect("back");
}
