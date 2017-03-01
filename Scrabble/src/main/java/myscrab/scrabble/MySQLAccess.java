/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package myscrab.scrabble;

import com.mysql.cj.api.jdbc.Statement;
import com.mysql.cj.jdbc.PreparedStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Błażej Dyrda
 */
public class MySQLAccess {

    private Connection connect = null;
    private Statement statement = null;
    private PreparedStatement preparedStatement = null;
    private ResultSet resultSet = null;

    public MySQLAccess(){
    connect = null;
    statement = null;
    preparedStatement = null;
    resultSet = null;
    };
    
    public boolean readWordFromDataBase(String word) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            connect = DriverManager.getConnection("jdbc:mysql://localhost:3306/data?user=root&password=admin");
            statement = (Statement) connect.createStatement();
            resultSet = statement.executeQuery("select * from data.slowa where slowo ='" + word + "' limit 1");
            if(resultSet.first()){
                System.out.println("true");
            }
            return resultSet.first();

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
            return false;
        } finally {
            close();
        }

    }

    public boolean checkUserInDataBase(String user, String passwd) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            connect = DriverManager.getConnection("jdbc:mysql://localhost:3306" + "user=root&password=admin");
            statement = (Statement) connect.createStatement();
            resultSet = statement.executeQuery("select * from data.users where username='" + user + "' and userpasswd='" + passwd + "' LIMIT 1");
            return resultSet.next();

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
            return false;
        } finally {
            close();
        }

    }

    private void close() {
        try {
            if (resultSet != null) {
                resultSet.close();
            }

            if (statement != null) {
                statement.close();
            }

            if (connect != null) {
                connect.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void writeResultSet(ResultSet resultSet) throws SQLException {
        while (resultSet.next()) {
            String word = resultSet.getString("slowo");
        }
    }
}
