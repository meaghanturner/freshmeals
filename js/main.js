$(function() {
// Variables
    var getStartedform = $("#get-started-form");

// Zipcode Validation
    $.validator.addMethod("zipcodeUS", function (value, element) {
        return this.optional(element) || /^\d{5}(?:-\d{4})?$/.test(value)
    }, "Please provide a valid zipcode.");

// Validate Form
    if (getStartedform.length) {
        getStartedform.validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                zipcode: {
                    required: true,
                    zipcodeUS: true
                }
            },
            messages: {
                email: "Please provide a valid email address.",
                zipcode: "Please provide a valid zipcode."
            },
            submitHandler: function (form) {
                var submit = $("#submit");
                submit.prop("disabled", true).addClass('disabled');
                $("#get-started-form input").prop("disabled", true);
                submit.html("Checking for meals available...");
                submit.location("meal-selection.html");
            }
        });
    }
});
