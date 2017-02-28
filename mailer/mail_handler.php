<?php
date_default_timezone_set('America/Los_Angeles');
require_once('email_config.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');

$mail = new PHPMailer;
$mail->SMTPDebug = 3;                               // Enable verbose debug output
// $mail->SMTPDebug = 0;                               // Enable for production

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication


$mail->Username = EMAIL_USER;                 // SMTP username
$mail->Password = EMAIL_PASS;                 // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
$mail->smtpConnect($options);
$mail->From = EMAIL_USER; //your email sending account
$mail->FromName = 'Kyle Marx';//your email sending account name

// $mail->addAddress(your email address, or the email the sender if you are sending confirmation, email address user name);     // Add a recipient   // Name is optional
$mail->addAddress(EMAIL_USER, 'Kyle Marx');     // Add a recipient
$mail->addAddress($_POST['email'], $_POST['name']);     // Add a recipient

// $mail->addReplyTo(/*email address of the person sending the message, so you can reply*/);
// not sure if this is working, I don't have anything to tell me that it is.
$mail->addReplyTo($_POST['email'], $_POST['name']);

//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = $_POST['subject'];         //accept a post variable
$mail->Body = $_POST['body'];         //accept a post variable
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

$output = [];
if(!$mail->send()) {
    $output['success'] = false;
    $output['message'][] = 'Message could not be sent.';
    $output['message'][] = 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    $output['success'] = true;
    $output['message'] = 'Message has been sent.';
}
print json_encode($output);
?>