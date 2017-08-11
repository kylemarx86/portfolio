<?php
date_default_timezone_set('America/Los_Angeles');
require_once('email_config.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');

$mail = new PHPMailer;
// $mail->SMTPDebug = 3;                               // Enable verbose debug output
$mail->SMTPDebug = 0;                               // Enable for production

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

$mail->addAddress(EMAIL_USER, 'Kyle Marx');     // Add a recipient

$mail->addReplyTo($_POST['email'], $_POST['name']);

$mail->isHTML(true);                                  // Set email format to HTML

// construct message
$name = $_POST['name'];
$email = $_POST['email'];
$body = $_POST['body'];
$message = "<p>name: $name</p><p>email: $email</p>$body";

$mail->Subject = $_POST['subject'];         // set message subject
$mail->Body = $message;                 // set message body
$mail->AltBody = strip_tags($message);      // set alternate text for non-html clients

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