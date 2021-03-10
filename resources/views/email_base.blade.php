<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Love Lives Generously</title>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Inter:200,600" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;800&display=swap" rel="stylesheet">
        <!-- Fonts -->
        <style>
            /*
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap')
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap')
            */
        </style>
        <style type="text/css">
            body {
                margin: 0;
            }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/fontawesome.min.css" integrity="sha512-8jdwayz5n8F2cnW26l9vpV6+yGOcRAqz6HTu+DQ3FtVIAts2gTdlFZOGpYhvBMXkWEgxPN3Y22UWyZXuDowNLA==" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/brands.min.css" integrity="sha512-AMDXrE+qaoUHsd0DXQJr5dL4m5xmpkGLxXZQik2TvR2VCVKT/XRPQ4e/LTnwl84mCv+eFm92UG6ErWDtGM/Q5Q==" crossorigin="anonymous" />
        <style type="text/css">
             * {
                font-family: 'Inter', 'Arial', sans-serif;
            }
            * li {
                margin: 0px;
                padding: 0px;
            }
            .receipt i.fab {
                font-family: 'Font Awesome 5 Brands';
                    color: #8992A6;
            }
            .receipt {
                width: 100%;
                height: 100%;
                background: #fff;
                padding: 35px;
            }
            .receipt > div {
                margin-bottom: 35px;
            }
            .receipt > div:last-child {
                margin: 0px !important;
            }
            .receipt > .receipt-header {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .receipt > .receipt-header > img.rounded-img {
                width: 80px !important;
                height: 80px !important;
                margin-right: 10px;
                border-radius: 40px;
            }
            .receipt > .receipt-header > * {
                display: inline-block;
                text-align: right;
            }
            .receipt > .receipt-header address {
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 150%;
                text-align: right;
                letter-spacing: 0.01em;
                color: #98999B;
                margin: 0;
            }
            .receipt > .receipt-body {
                padding: 35px 0px;
                border-bottom: 1px solid rgba(0,0,0,0.08);
                border-top: 1px solid rgba(0,0,0,0.08);
            }
            .receipt > .receipt-summary {
                
            }
            .receipt > .receipt-summary ul {
                margin: 0;
                padding: 0;
                background: #F3F3F3;
            }
            .receipt > .receipt-summary ul li {
                display: block;
                align-items: center;
                justify-content: space-between;
                padding: 20px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.08);
            }
            .receipt > .receipt-summary ul li:last-child {
                font-weight: 600;
                border: 0px;
            }

            .receipt > .receipt-footer {
                background: #31313F;
                padding: 25px;
            }
            .receipt > .receipt-footer p {
                padding: 18px 0 0;
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 160%;
                text-align: center;
                letter-spacing: 0.01em;
                color: #848DA0;
                width: 100%;
                max-width: 280px;       
                margin: 0 auto;
            }
            .receipt > .receipt-footer ul {
                display: block;
                margin: 0;
                padding: 0;
                align-items: center;
                justify-content: center;
            }
            .receipt > .receipt-footer ul li {
                margin: 0 6px;
                background: rgba(137, 146, 166, 0.08);
                border-radius: 50px;
                width: 100%;
                max-width: 27.13px;
                height: 27.13px;
                display: block;
                align-items: center;
                justify-content: center;
            }
        </style>
        <style type="text/css">
            .wrapper {
                height: 100%;
                background: #f2f2f2;
                margin: 0 auto;
            }

            .container {
                width: 60%;
                margin: 0 auto;
                padding-bottom: 20px;
            }

            .content {
                background: white;
                padding: 20px 40px;
                border-radius: 8px;
            }

            .img {
                display: block;
                margin-left: auto;
                margin-right: auto;
                padding: 50px 0;
            }

            .content strong {
                font-family: 'Poppins', 'Arial';
                color: #92A9AB;
                font-size: 23px;
                font-weight: 800;
            }

            .cta-container {
                margin: auto;
                width: min-content;
            }

            .cta-container a {
/*                margin: 0;
                position: relative;
                top: 50%;
                -ms-transform: translateY(-50%);
                transform: translateY(-50%);*/
            }

            p {
                font-size: 16px;
                font-weight: normal;
                color: #000000;
                opacity: 0.7;
            }

            p.note {
                color: #c6c6c6;
            }

            button {
                color: #fff;
                background: #cf995f;
                border: 1px solid #cf995f;
                width: 400px;
                padding: 15px 10px;
                border-radius: 24px;
                margin-top: 15px;
                margin-bottom: 20px;
            }

            .social-icons {
                margin: auto;
                margin-top: 50px;
                margin-bottom: 25px;
                width: 355px;
            }

            .social-icons img {
                margin: 0 40px;
            }

            .divider {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 50px;
                margin-bottom: 50px;
            }

            .divider div {
                width: 100%;
                border: 2px solid #d4d4d4;
                margin: 0 50px; 
                height: 0px;
                top: 50%;
                background: #d4d4d4;
            }

            h2 span { 
                background:#fff; 
                padding:0 10px; 
            }

            .bottom {
                text-align: center;
            }

            .address {
                margin-bottom: 50px;
            }
        </style>
        @stack('css')

    </head>
    <body>
        @yield('content')
        <!-- <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
            <tr>
                <td>&nbsp;</td>
                <td class="container">
                    <div class="content">
                        <div class="footer">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tr>

                                </tr>
                            </table>
                        </div>
                    </div>
                </td>
                <td>&nbsp;</td>
            </tr>
        </table> -->
    </body>
    @stack('js')
</html>
