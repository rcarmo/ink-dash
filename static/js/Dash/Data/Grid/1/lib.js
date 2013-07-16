Ink.createModule(
    'Dash.Data.Grid',        // full module name
    '1',                     // module version
    ['Ink.Dom.Element_1', 'Ink.Dom.Selector_1', 'Ink.Net.Ajax_1', 'Dash.Data.Binding_1'],  // array of dependency modules
    function(Element, Selector, Ajax, Binding) {         // this fn will be called async with dependencies as arguments
        'use strict';

        var _getColumns = function(data) {
            if ((typeof data.length !== 'number') || data.length === 0) {
                return [];
            }
            var columns = [];
            for (var name in data[0]) {
                columns.push({ header: name, row: name });
            }
            return columns;
        };


        Binding.DataGrid = {
            // Defines a view model class you can use to populate a grid

            self: this,

            template: null,

            viewModel: function(configuration) {
                console.log("--> viewModel");
                this.data = configuration.data;
                this.page = Binding.observable(0);
                this.limit = configuration.limit || 5;

                // If no columns are specified, we'll use introspection to label them
                this.columns = configuration.columns || _getColumns(Binding.utils.unwrapObservable(this.data));

                this.found = Binding.computed(function () {
                    var offset = this.limit * this.page();
                    return this.data.slice(offset, offset + this.limit);
                }, this);

                this.bound = Binding.computed(function () {
                    return Math.ceil(Binding.utils.unwrapObservable(this.data).length / this.limit) - 1;
                }, this);
                console.log("<-- viewModel");
            }
        };


        Binding.bindingHandlers.DataGrid = {
            self: this,

            init: function() {
                console.log("--> init")
                self.engine = new Binding.nativeTemplateEngine();
                
                return { 'controlsDescendantBindings': true };
            },

            // This method is called to initialize the node, and will also be called again if you change what the grid is bound to
            update: function (container, modelAccessor, bindingsAccessor) {
                console.log("--> update");

                var model = modelAccessor(), bindings = bindingsAccessor();

                console.log("container : " + container);
                console.log("model     : " + model);
                console.log("bindings  : " + bindings);

                // Empty the element
                while(container.firstChild)
                    Binding.removeNode(container.firstChild);

                var gridTemplate       = self.template,
                    paginationTemplate = bindings.template + '-pagination';

                // Render the main grid
                var subcontainer = container.appendChild(document.createElement("DIV"));
                Binding.renderTemplate('data-grid', model, { templateEngine: self.engine }, subcontainer, "replaceNode");

                // Render the page links
                //var subcontainer = container.appendChild(document.createElement("DIV"));
                //Binding.renderTemplate(paginationTemplate, model, { templateEngine: self.engine }, subcontainer, "replaceNode");
                console.log("<-- update");
            }
        };

           

        var Grid = function(configuration) {
            console.log("--> Grid")
            this.GridModel = Binding.DataGrid.viewModel(configuration);
            console.log("<-- Grid")
        }

        return Grid;
    }
);