
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <% 
            response.setHeader("Refresh", "2;url=LogPop.jsp?msg="); 
        %>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Loading...</title>
        <link rel="stylesheet" type="text/css" href="mystyle.css">
    </head>
    <body style="background-color:#3f004a">
        <div class="main">
            <center><img src="Images/ic_app.png" height="500" width="500"/></center>
            <center><div class="loader"></div></center>
        </div>
		<script src="/scripts/worker.js"></script>
    </body>
</html>
