<?php
class Database
{
    private $servername="localhost";
    private $username =  "root";
    private $password = "";
    private $conn;
    private $sql;
    private $result;
    private $row;
    public function __construct()
    {
        $this->conn = new mysqli($this->servername, $this->username, $this->password);
        if ($this->conn->connect_error) {
            die("failed: " . $this->conn->connect_error);
        }
        $this->sql = "CREATE DATABASE db_test";
        if ($this->conn->query( $this->sql) === TRUE) {
        }
        $this->conn = new mysqli($this->servername, $this->username, $this->password, "db_test");
        if ($this->conn->connect_error) {
            die("failed: " . $this->conn->connect_error);
        }
        $this->sql = 'CREATE TABLE `data`
      ( id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
         `content` varchar(50) NOT NULL UNIQUE);';
        if ($this->conn->query($this->sql) === TRUE){
        }
    }
   public function select(){
        $this->sql="SELECT * FROM data ";
       $this->result = mysqli_query($this->conn, $this->sql) or die("error" . mysqli_error($this->conn));
       if ($this->result->num_rows > 0) {
           while ($this->row = $this->result->fetch_assoc()) {
               $output[] = [$this->row['id'], $this->row['content']];
           }
           echo json_encode($output);
       }
    }
    public function insert($content){
  $this->sql = "INSERT INTO `data`(`content`) VALUES ('{$content}')";
        if ($this->conn->query($this->sql) === TRUE) {
            return "Success insert data";
        } else {
            return "error";
        }
    }
    public function update($id,$name){
       $this->sql = "UPDATE data SET content='{$name}' WHERE id='{$id}'";
        if (mysqli_query($this->conn,  $this->sql)) {
        } else {
        }
    }
    public function delete($delete_id){
        $this->sql = "DELETE FROM data WHERE id='{$delete_id}'";
        if (mysqli_query($this->conn,  $this->sql)) {
        } else {
        }
    }
}
class checking_data
{
    public function __construct()
    {
        $obj = new Database();
        if (isset($_POST['action']) && $_POST['action'] == 'insert'){
            $content = trim($_POST['content']);
            $insert_msg = $obj->insert($content);
            echo json_encode($insert_msg);
        }
        if (isset($_POST['action']) && $_POST['action'] == 'select'){
             $obj->select();
        }
        if (isset($_POST['action']) && $_POST['action'] == 'update'){
            $id = $_POST['id'];
            $content2 = $_POST['content2'];
            $obj->update("{$id}","{$content2}");
        }
        if (isset($_POST['action']) && $_POST['action'] == 'delete'){
            $delete_id =  $_POST['hidden_id'];
            $obj->delete("{$delete_id}");
        }
    }
}
$checking_data = new checking_data();