$(document).ready(function () {
	var pword = /[a-zA-Z_][\w \= \+ \- \* \/]+/;
	var pout = /^(out [^\d]\w*)/;
	var pin = /^(in [^\d]\w*)/;
	var pv = /[^\d]\w*/;
	var comp = "";
	var f = false;
	var l = "";
	$('#run').click(function () {
		var v = Array();
		var lines = $('#text').val().split('\n');
		for (var i = 0; i < lines.length; i++) {
			if (lines[i].length > 0) {

				// check for in 
				if (pin.test(lines[i])) {
					var tv = /[^in ](\w*)/.exec(lines[i]);
					v[tv[0]] = prompt('enter value for "' + tv[0] + '" variable');
				}
				//check for out
				else if (pout.test(lines[i])) {
					var tv = /[^out ](\w*)/.exec(lines[i]);
					if (v[tv[0]] != null) {
						alert(v[tv[0]]);
					} else {
						console.error('variable "' + tv[0] + '" undefined!');
					}
				} else if (pword.test(lines[i])) {
					lines[i] = lines[i].replace(/^\s+|\s+$|\s+(?=\s)/g, "");
					var s = lines[i].split(" ");
					if (s.length == 3 && s[1] == "=") {
						v[s[0]] = s[2];
					} else if (s.length == 5 && s[1] == "=") {

						if (pv.test(s[2])) {
							if (v[s[2]] != null) {
								s[2] = v[s[2]];
							} else {
								console.error("variable '" + s[2] + "' is undefined!");
							}
						}
						if (pv.test(s[4])) {
							if (v[s[4]] != null) {
								s[4] = v[s[4]];
							} else {
								console.error("variable '" + s[4] + "' is undefined!");
							}
						}
						if (s[3] == "+") {
							v[s[0]] = parseFloat(s[2]) + parseFloat(s[4]);
						} else if (s[3] == "-") {
							v[s[0]] = parseFloat(s[2]) - parseFloat(s[4]);
						} else if (s[3] == "*") {
							v[s[0]] = parseFloat(s[2]) * parseFloat(s[4]);
						} else if (s[3] == "/") {
							v[s[0]] = parseFloat(s[2]) / parseFloat(s[4]);
						}
					}
				} else {
					console.error("line: " + i + " has an error");
				}
			}
		}
	});
	$('#com').click(function () {
		var v = Array();
		comp = "";
		f = false;
		var lines = $('#text').val().split('\n');
		for (var i = 0; i < lines.length; i++) {
			if (f == true) {
				l = i;
				break;
			}
			if (lines[i].length > 0) {

				// check for in 
				if (pin.test(lines[i])) {
					var tv = /[^in ](\w*)/.exec(lines[i]);
					v[tv[0]] = " ";
					comp += "var " + tv[0] + " = prompt('enter value for '" + tv[0] + "' variable');" + "\n";
				}
				//check for out
				else if (pout.test(lines[i])) {
					var tv = /[^out ](\w*)/.exec(lines[i]);
					if (v[tv[0]] != null) {
						comp += "alert('" + tv[0] + "');\n";
					} else {
						console.error('variable "' + tv[0] + '" undefined!');
						f = true;

					}
				} else if (pword.test(lines[i])) {
					lines[i] = lines[i].replace(/^\s+|\s+$|\s+(?=\s)/g, "");
					var s = lines[i].split(" ");
					if (s.length == 3 && s[1] == "=") {
						v[s[0]] = " ";
						comp += "var " + s[0] + " = " + s[2] + "\n";
					} else if (s.length == 5 && s[1] == "=") {
						if (v[s[0]] == null) {
							comp += "var "
						}
						v[s[0]] = " ";
						if (pv.test(s[2])) {
							if (v[s[2]] != null) {

							} else {
								console.error("variable '" + s[2] + "' is undefined!");
								f = true;
								break;
							}
						}
						if (pv.test(s[4])) {
							if (v[s[4]] = null) {
								console.error("variable '" + s[4] + "' is undefined!");
								f = true;
								break;
							}
						}
						if (s[3] == "+") {
							comp += s[0] + " = " + s[2] + " + " + s[4] + "\n";
						} else if (s[3] == "-") {
							comp += s[0] + " = " + s[2] + " - " + s[4] + "\n";
						} else if (s[3] == "*") {
							comp += s[0] + " = " + s[2] + " * " + s[4] + "\n";
						} else if (s[3] == "/") {
							comp += s[0] + " = " + s[2] + " / " + s[4] + "\n";
						}
					}
				} else {
					console.error("line: " + i + " has an error");
				}
			}
		}
		if (f == true) {
			console.error("we have error");
			$("#out").html("we have error");
		} else {

			$("#out").html(comp);
		}
	});
});