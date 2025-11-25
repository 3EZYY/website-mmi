<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .email-header {
            background-color: #4F46E5;
            color: #ffffff;
            padding: 30px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 40px 30px;
            color: #333333;
        }
        .email-body p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .code-container {
            text-align: center;
            margin: 30px 0;
        }
        .reset-code {
            display: inline-block;
            font-size: 36px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #4F46E5;
            background-color: #F3F4F6;
            padding: 20px 40px;
            border-radius: 8px;
            border: 2px dashed #4F46E5;
        }
        .warning {
            background-color: #FEF3C7;
            border-left: 4px solid #F59E0B;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
            color: #92400E;
        }
        .email-footer {
            background-color: #F9FAFB;
            padding: 20px 30px;
            text-align: center;
            font-size: 12px;
            color: #6B7280;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>🔐 Password Reset Request</h1>
        </div>
        
        <div class="email-body">
            <p>Hello,</p>
            
            <p>We received a request to reset your password for your MMI Website account. Use the 6-digit code below to proceed with resetting your password:</p>
            
            <div class="code-container">
                <div class="reset-code">{{ $code }}</div>
            </div>
            
            <p style="text-align: center; color: #6B7280; font-size: 14px;">
                This code will expire in <strong>15 minutes</strong>.
            </p>
            
            <div class="warning">
                <strong>⚠️ Security Notice:</strong> If you didn't request a password reset, please ignore this email or contact support if you have concerns about your account security.
            </div>
            
            <p>For security reasons, never share this code with anyone, including MMI Website staff.</p>
            
            <p>Best regards,<br><strong>MMI Website Team</strong></p>
        </div>
        
        <div class="email-footer">
            <p>&copy; {{ date('Y') }} MMI Website. All rights reserved.</p>
            <p>This is an automated message. Please do not reply to this email.</p>
        </div>
    </div>
</body>
</html>
