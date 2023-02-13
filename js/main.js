$(function () {
    // Variables
    let getStartedform = $("#get-started-form");

    // Zipcode Validation
    $.validator.addMethod("zipcodeUS", function (value, element) {
        return this.optional(element) || /^\d{5}(?:-\d{4})?$/.test(value)
    }, "Please provide a valid zipcode.");

    // Validate Form
    if (getStartedform.length > 0) {
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
                $("#get-started-form input").prop("disabled", true);

                let submit = $("#submit");
                submit.prop("disabled", true).addClass('disabled');
                submit.html("Checking for meals available...");
                submit.location("meal-selection.html");
            }
        });
    }
});
