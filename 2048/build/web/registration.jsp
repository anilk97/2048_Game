

<%@page import="Database.DataManup"%>
<%@page import="Database.Data"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <base target="_parent">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="mystyle.css">
        <style>
            td,p{
                font-size: 18px;
                font-weight: lighter;
                font-family: 'Open Sans',Arial,sans-serif;
                color: #f3f3f3;
            }
        </style>
        <%!String name = "", pass = "", mail = "";%>
        <%
            if (request.getParameter("name") != null) {
                String s = request.getParameter("name");
                if (s.charAt(0) < 'A' || s.charAt(0) > 'z') {
                    response.sendRedirect("LogPop.jsp?msg=Please_enter_correct_details");
                }
            }
            if (request.getParameter("userPass") != null) {
                if (!request.getParameter("userPass").toString().equals(request.getParameter("CuserPass").toString())) {
                    response.sendRedirect("LogPop.jsp?msg=Please_enter_correct_details");
                } else {
                    Data ob = new Data();
                    ob.setName(request.getParameter("name"));
                    ob.setPassword(request.getParameter("userPass"));
                    ob.setEmail(request.getParameter("usermail"));
                    DataManup obj = new DataManup();
                    if (obj.insert(ob)) {
                        response.sendRedirect("home.jsp?name=" + ob.getName() + "&pass=" + ob.getPassword() + "&mail=" + ob.getEmail()+"&score="+ob.getScore());
                    } else {
                        response.sendRedirect("LogPop.jsp?msg=User_already_exist");
                    }

                }
            }
        %>
        
    </head>
    <body>
        <br><br> <br><br> <br><br>
        <form>
            <table>
                <tr>
                    <td>Name:</td>
                    <td><input type="text" name="name" required maxlength="20"/></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><input type="password" name="userPass" required maxlength="20"/></td>
                </tr>
                <tr>
                    <td>Confirm Password:</td>
                    <td><input type="password" name="CuserPass" required maxlength="20"/></td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td><input type="email" name="usermail" required maxlength="30"/></td>
                </tr>
                <tr>
                    <td><input type="submit" name="sub" value="Sign Up"/></td>
                    <td></td>
                </tr>
            </table>
        </form>
        <br><br>
        <a href="login.jsp?msg=" target="_self">Log In Here</a>
    </body>
</html>
