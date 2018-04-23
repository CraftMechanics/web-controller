<?php
$file = fopen("movementSpeed.txt", "w");
$q = $_REQUEST["q"];
fwrite($file, $q);
fclose($file);
echo($q);
?>