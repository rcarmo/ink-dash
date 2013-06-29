Ink.createModule(
    'Dash.Data.Grid',         // full module name
    '1',                     // module version
    ['Dash.Data.Binding_1'],  // array of dependency modules
    function(Binding) {         // this fn will be called async with dependencies as arguments
        'use strict';

        var _getColumnsForScaffolding = function(data) {
            if ((typeof data.length !== 'number') || data.length === 0) {
                return [];
            }
            var columns = [];
            for (var propertyName in data[0]) {
                columns.push({ headerText: propertyName, rowText: propertyName });
            }
            return columns;
        };


        // Templates used to render the grid
        var templateEngine = new Binding.nativeTemplateEngine();

        templateEngine.addTemplate = function(templateName, templateMarkup) {
            document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "<" + "/script>");
        };


        templateEngine.addTemplate("ink_simpleGrid_grid", "\
            <table class=\"ink-grid\" cellspacing=\"0\">\
                <thead>\
                    <tr data-bind=\"foreach: columns\">\
                       <th data-bind=\"text: headerText\"></th>\
                    </tr>\
                </thead>\
                <tbody data-bind=\"foreach: itemsOnCurrentPage\">\
                   <tr data-bind=\"foreach: $parent.columns\">\
                       <td data-bind=\"text: typeof rowText == 'function' ? rowText($parent) : $parent[rowText] \"></td>\
                    </tr>\
                </tbody>\
            </table>");


        templateEngine.addTemplate("ink_simpleGrid_pageLinks", "\
            <div class=\"ink-grid-pageLinks\">\
                <span>Page:</span>\
                <!-- ko foreach: ko.utils.range(0, maxPageIndex) -->\
                       <a href=\"#\" data-bind=\"text: $data + 1, click: function() { $root.currentPageIndex($data) }, css: { selected: $data == $root.currentPageIndex() }\">\
                    </a>\
                <!-- /ko -->\
            </div>");


        Binding.bindingHandlers.simpleGrid = {
            init: function() {
                return { 'controlsDescendantBindings': true };
            },

            // This method is called to initialize the node, and will also be called again if you change what the grid is bound to
            update: function (element, viewModelAccessor, allBindingsAccessor) {
                var viewModel = viewModelAccessor(), allBindings = allBindingsAccessor();

                // Empty the element
                while(element.firstChild)
                    ko.removeNode(element.firstChild);

                // Allow the default templates to be overridden
                var gridTemplateName      = allBindings.simpleGridTemplate || "dash_simpleGrid_grid",
                    pageLinksTemplateName = allBindings.simpleGridPagerTemplate || "dash_simpleGrid_pageLinks";

                // Render the main grid
                var gridContainer = element.appendChild(document.createElement("DIV"));
                Binding.renderTemplate(gridTemplateName, viewModel, { templateEngine: templateEngine }, gridContainer, "replaceNode");

                // Render the page links
                var pageLinksContainer = element.appendChild(document.createElement("DIV"));
                Binding.renderTemplate(pageLinksTemplateName, viewModel, { templateEngine: templateEngine }, pageLinksContainer, "replaceNode");
            }
        };


        Binding.Grid = {
            // Defines a view model class you can use to populate a grid
            viewModel: function (configuration) {
                this.data = configuration.data;
                this.currentPageIndex = Binding.observable(0);
                this.pageSize = configuration.pageSize || 5;

                // If you don't specify columns configuration, we'll use scaffolding
                this.columns = configuration.columns || _getColumnsForScaffolding(Binding.utils.unwrapObservable(this.data));

                this.itemsOnCurrentPage = Binding.computed(function () {
                    var startIndex = this.pageSize * this.currentPageIndex();
                    return this.data.slice(startIndex, startIndex + this.pageSize);
                }, this);

                this.maxPageIndex = Binding.computed(function () {
                    return Math.ceil(Binding.utils.unwrapObservable(this.data).length / this.pageSize) - 1;
                }, this);
            }
        };

        return Binding.Grid;
    }
);
