// Validation of HTML input fields
function validateFields() {
	var first_name = document.getElementById("first-name").value;
	var surname = document.getElementById("surname").value;
	var email = document.getElementById("email").value;
  	var dob = document.getElementById("date-of-birth").value;
	var gender = $("input[name='gender']:checked");
	var gender_selected = gender.val();

	if (first_name.length < 2) {
		alert("Provide your First Name, please!");
	} else if (surname.length < 2) {
		alert("Provide your Surname, please!");
	}  else if (!validateEmail(email)) {
		alert("Provide Correct Format Email, please!");
	} else if (gender.length === 0) {
		alert("Select Gender, please!");
	} else if (dob == "") {
    	alert("Select Date of Birth, please!");
  	} else {
		confirm("Are you sure you want to submit your data?");

	    displayJsonArray(first_name, surname, email, gender_selected, dob);
	    saveDataToLocalStorage(first_name, surname, email, gender_selected, dob);
	}
}

// This function returns a String of the user details
function displayJsonArray (first_name, surname, email, gender, dob) {
    var user_details = '{"new_user":[{"first_name": ' + first_name + ', "last_name": ' + surname + ', "email": ' + email + ', "gender": ' + gender +', "date_of_birth": ' + dob + '}]}';
    console.log(user_details);
}

// Saves the registered user in the local storage
function saveDataToLocalStorage(first_name, last_name, email, gender, dob) {
    addUserDataToLocalDatabase("first_name", first_name);
    addUserDataToLocalDatabase("last_name", last_name);
    addUserDataToLocalDatabase("email", email);
    addUserDataToLocalDatabase("gender", gender);
    addUserDataToLocalDatabase("date_of_birth", dob);
}

function addUserDataToLocalDatabase(key, value) {
	localStorage.setItem(key, value);
}

// Retrieves the registered user from the local storage
$('.nav_users').click(function() {
    retrieveDataFromLocalStorage();
});

function retrieveDataFromLocalStorage() {
    var first_name = localStorage.getItem("first_name");
    var surname = localStorage.getItem("last_name");
    var email = localStorage.getItem("email");
    var gender = localStorage.getItem("gender");
    var dob = localStorage.getItem("date_of_birth");
    var user_array = [first_name, surname, email, gender, dob];

    populateInputFields(user_array);
}

// Populate the input fields with data from the local storage
function populateInputFields(user_array) {
    $("#first-name").val(user_array[0]);
    $("#surname").val(user_array[1]);
    $("#email").val(user_array[2]);
    $("#date-of-birth").val(user_array[4]);
	var gender = user_array[3] === "female" ? "female" : "male";

	checkGenderCheckBox(gender);
}

function checkGenderCheckBox(gender) {
	$('#'+gender).prop("checked", true);
}

// Simple email validation
function validateEmail(email) {
	var email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	return email.match(email_regex);
}

// Toggle for the mobile menu button
$('.mobile-menu-icon').click(function() {
	var navigation = $('.main-nav');
	navigation.slideToggle(250);
});
