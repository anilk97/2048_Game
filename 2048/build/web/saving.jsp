

<%@page import="Database.DataManup"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Saving</title>
        <%!String mail,pass;
        int s;%>
        <%
            DataManup dm=new DataManup();
            mail=request.getParameter("mail");
            pass=request.getParameter("pass");
            s=Integer.parseInt(request.getParameter("score"));
            dm.saveData(s, mail, pass);
            response.setHeader("Refresh", "1;url=index.jsp");
            %>
            
    </head>
    <body>
        
    </body>
</html>
