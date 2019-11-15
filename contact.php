<?php

if ( isset( $_POST['submit'] ) ) {
	$header = "From: " . $_POST["name"] . " <" . $_POST["email"] . ">\n";
	$body = $header . "Message:\n" . $_POST["message"];
	$header = $header . "Reply-To: " . $_POST["email"] . "\n";

	if( mail( "jlong@long-technical.com", "Authentic Metal Solutions - Contact Form", $body, $header ) ) {
		print "success";
	} else {
		print "fail";
	}
}
// Redirect to home page
// print "<script type=\"text/javascript\">window.location = \"index.html\";</script>";

?>
