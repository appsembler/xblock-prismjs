/* Javascript for PrismXBlock. */
function PrismXBlockEditBlock(runtime, element) {
    var $element = $(element);
    var notify;

    var lngSelect = document.getElementById('language');
    var thmSelect = document.getElementById('theme');

    notify = typeof(runtime.notify) != 'undefined';

    var codeMirror = CodeMirror.fromTextArea(document.querySelectorAll('textarea#code-textarea')[0], {
        lineNumbers: true,
        indentWithTabs: true,
        matchBrackets: true,
        lineWrapping: true
    });

    $(element).find('.save-button').bind('click', function(){
        var handlerUrl = runtime.handlerUrl(element, 'studio_submit');

        var data = {
            display_name: $(element).find('input[name=display_name]').val(),
            code_data: codeMirror.getValue(),
            language: lngSelect.options[lngSelect.selectedIndex].value,
            theme: thmSelect.options[thmSelect.selectedIndex].value,
            maxheight: $(element).find('input[name=maxheight]').val(),

        };

        if (notify){
            runtime.notify('save', {state: 'start'});
        }
    
       $.ajax({
           type: "POST",
           url: handlerUrl,
           data: JSON.stringify(data),
           success: function(result) {
               if (result.result === 'success' && notify){
                   runtime.notify('save', {state: 'end'})
               } else if (notify){
                   runtime.notify('error', {
                       'title': 'Error saving Prism component',
                       'message': 'Error: '+result.result
                   });
               }
           }
       });
    });

    $(element).find('.cancel-button').bind('click', function() {
        runtime.notify('cancel', {});
    });
}