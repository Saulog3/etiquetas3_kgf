<?php 
$hostname = 'localhost';
$username = 'seu_usuario';
$password = 'kgf@6590';
$dbname = 'sistema_inspecao';

$conn = new mysqli($hostname, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
// Define o charset para evitar problemas com acentos
$conn->set_charset("utf8mb4");

echo "Conectado com sucesso!";

?>

