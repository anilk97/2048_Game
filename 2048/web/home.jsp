

<%@page import="Database.DataManup"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Enumeration"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <base target="_parent">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>2048</title>
        <link rel="stylesheet" type="text/css" href="mystyle.css">
        <style>
            body{
                font-size: 18px;
                font-weight: lighter;
                font-family: 'Open Sans',Arial,sans-serif;
                color: #f3f3f3;
            }
            td{
                background-color:#e3efff;
                height:100px;
                width: 100px;
                text-align: center;
                color:#000000;
                font-size: larger;
            }

        </style>
        <%!String mail, pass, name;
            int score;

        %>
        <%
            try{
            mail = request.getParameter("mail");
            pass = request.getParameter("pass");
            name = request.getParameter("name");
            score = Integer.parseInt(request.getParameter("score"));
            }catch(Exception e){
                mail="null";
                pass="null";
                name="No Name";
                score=0;
            }
        %>


        <script src="myscript.js"></script>
    </head>
    <body style="background-image: url('Images/back.png')" onkeyup="updateData()">
        <div class="top">
            <div class="tl">
                <img src="Images/ic_app.png" height="100" width="100"/>
            </div>
            <div class="tr">
                <p onclick="logout()">Logout to save</p>
            </div>
        </div>

        <div class="mid">
            <div class="ml">
                <p class="res">&nbsp;<strong><%=name%></strong></p>
                <div class="res">
                    <img src="Images/res.png" onclick="restart()" height="50" width="50" style="cursor:pointer;"/>
                </div>
                <div class="score">
                    <div class="mscore">Score<br><p id="score">0</p></div>
                    <div class="mscore">Best<br><%=score%></div>
                </div>
            </div>
            <div class="mm">
                <table cellspacing="10" border="0" id="mytable">
                    <tr>
                        <td id="00"></td>
                        <td id="01"></td>
                        <td id="02"></td>
                        <td id="03"></td>
                    </tr>
                    <tr>
                        <td id="10"></td>
                        <td id="11"></td>
                        <td id="12"></td>
                        <td id="13"></td>
                    </tr>
                    <tr>
                        <td id="20"></td>
                        <td id="21"></td>
                        <td id="22"></td>
                        <td id="23"></td>
                    </tr>
                    <tr>
                        <td id="30"></td>
                        <td id="31"></td>
                        <td id="32"></td>
                        <td id="33"></td>
                    </tr>
                </table>
            </div>
        </div>
        <script type="text/javascript">

            setTable();
        </script>
    </body>
</html>
