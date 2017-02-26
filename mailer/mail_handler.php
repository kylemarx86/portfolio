<?php
date_default_timezone_set('America/Los_Angeles');
require_once('email_config.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');

$mail = new PHPMailer;
$mail->SMTPDebug = 3;                               // Enable verbose debug output

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
// $mail->From = 'example@gmail.com';//your email sending account
// $mail->FromName = 'example name';//your email sending account name

$mail->From = EMAIL_USER; //your email sending account
$mail->FromName = 'Kyle Marx';//your email sending account name

$mail->addAddress(EMAIL_USER, 'Kyle Marx');     // Add a recipient
$mail->addAddress($_POST['email'], $_POST['name']);     // Add a recipient          //prob want to comment out in testing
// $mail->addAddress(/*your email address, or the email the sender if you are sending confirmation*/      /*,*/      /*email address user name*/);     // Add a recipient

//$mail->addAddress('ellen@example.com');               // Name is optional

// $mail->addReplyTo(/*email address of the person sending the message, so you can reply*/);
// $mail->addReplyTo(/*email address of the person sending the message, so you can reply*/);

//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');

//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

// $mail->Subject = 'Here is the subject';         //accept a post variable
$mail->Subject = $_POST['subject'];         //accept a post variable
// echo $_POST['body'];
// print_r $_POST;
$mail->Body = $_POST['body'];         //accept a post variable
// $mail->Body = 'This is the HTML message body <b>in bold!</b>';   //accept a post variable 
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}
?>
