// Template to clone, edit and add html

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['info_window'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<img src=\""
    + container.escapeExpression(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"img","hash":{},"data":data}) : helper)))
    + "\" style=\"max-width: 200px; height: auto; alt=\"Drumpfs\" />\n";
},"useData":true});
})();