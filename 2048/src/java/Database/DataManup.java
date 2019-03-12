
package Database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;


public class DataManup {
    Connection con;

    public DataManup() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/mydata", "root", "");
        } catch (Exception e) {

            System.out.println(e.getMessage());
        }
    }

    public boolean insert(Data ob) {
        boolean b = false;
        
        try {
            String s = "insert into game values(?,?,?,?);";
            PreparedStatement ps = con.prepareStatement(s);
            ps.setString(1, ob.getName());
            ps.setString(2, ob.getPassword());
            ps.setInt(4, ob.getScore());
            ps.setString(3, ob.getEmail());
            int p = ps.executeUpdate();
            if(p==1)
                b=true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return b;
    }

    public boolean checkUser(String mail, String pass) {
        ResultSet rs;
        String s = "select * from game where email=?&&password=?";
        try {
            PreparedStatement ps = con.prepareStatement(s);
            ps.setString(1, mail);
            ps.setString(2, pass);
            rs = ps.executeQuery();
            if (rs.first()) {
                return true;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return false;
    }
    
    public void saveData(int sc,String mail,String pass){
        ResultSet rs = null;
        System.out.println("savedata");
        try{
            String s="select * from game where email=?&&password=?";
            PreparedStatement ps= con.prepareStatement(s);
            ps.setString(1, mail);
            ps.setString(2, pass);
            rs= ps.executeQuery();
            rs.first();
            Data ob=new Data();
            ob.setName(rs.getString(1));
            ob.setEmail(mail);
            ob.setPassword(pass);
            ob.setScore(sc);
            System.out.println("delete");
            /*rs.first();
            rs.updateInt(4, sc);
            rs.updateRow();*/
            s = "delete from game where email=?&&password=?";
            ps= con.prepareStatement(s);
            ps.setString(1, mail);
            ps.setString(2, pass);
            ps.executeUpdate();
            insert(ob);
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
        
    }
    public String getName(String mail,String pass){
        ResultSet rs;
        String s = "select * from game where email=?&&password=?";
        try {
            PreparedStatement ps = con.prepareStatement(s);
            ps.setString(1, mail);
            ps.setString(2, pass);
            rs = ps.executeQuery();
            rs.first();
            return rs.getString(1);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }
    public int getScore(String mail,String pass){
        ResultSet rs;
        String s = "select * from game where email=?&&password=?";
        try {
            PreparedStatement ps = con.prepareStatement(s);
            ps.setString(1, mail);
            ps.setString(2, pass);
            rs = ps.executeQuery();
            rs.first();
            return rs.getInt(4);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return 0;
    }
}
