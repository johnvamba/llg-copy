<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Love Lives Generously</title>

        <!-- Fonts -->
        <style type="text/css">
            @font-face {
                font-family: InterRegular;
                src: url('{{ asset('fonts/Inter-Regular-slnt=0.ttf') }}');
            }

            @font-face {
                font-family: InterMedium;
                src: url('{{ asset('fonts/Inter-Regular-slnt=0.ttf') }}');
            }

            @font-face {
                font-family: InterSemibold;
                src: url('{{ asset('fonts/Inter-Regular-slnt=0.ttf') }}');
            }

            @font-face {
                font-family: BrownStdRegular;
                src: url('{{ asset('fonts/Inter-Regular-slnt=0.ttf') }}');
            }

            @font-face {
                font-family: BrownStdBold;
                src: url('{{ asset('fonts/Inter-Regular-slnt=0.ttf') }}');
            }
            body {
                margin: 0;
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
</html>
