module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('assets');
    eleventyConfig.addCollection("projects", function (collection) {
        // Turn all markdown files in projects folder into an object to access in front end, and sort it by date
        return collection.getFilteredByGlob("projects/*.md").sort(function(a, b) {
            return new Date(b.data.dates.updated).getTime() - new Date(a.data.dates.updated).getTime();
        });
    });
    eleventyConfig.setLiquidOptions({
		dynamicPartials: false,
		strictFilters: false
	});
}