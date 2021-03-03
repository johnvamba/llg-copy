<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Love Lives Generously</title>
        <link href="https://fonts.googleapis.com/css?family=Inter:200,600" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap" rel="stylesheet">
        <!-- Fonts -->
        <style type="text/css">
            body {
                margin: 0;
            }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/fontawesome.min.css" integrity="sha512-8jdwayz5n8F2cnW26l9vpV6+yGOcRAqz6HTu+DQ3FtVIAts2gTdlFZOGpYhvBMXkWEgxPN3Y22UWyZXuDowNLA==" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/brands.min.css" integrity="sha512-AMDXrE+qaoUHsd0DXQJr5dL4m5xmpkGLxXZQik2TvR2VCVKT/XRPQ4e/LTnwl84mCv+eFm92UG6ErWDtGM/Q5Q==" crossorigin="anonymous" />
        <style type="text/css">
             * {
                font-family: 'Inter', sans-serif;
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
                display: flex;
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
                display: flex;
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
                display: flex;
                align-items: center;
                justify-content: center;
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
