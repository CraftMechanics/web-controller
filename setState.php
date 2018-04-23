<?php
$file = fopen("state.txt", "w");
$q = $_REQUEST["q"];
fwrite($file, $q);
fclose($file);
echo($q);
?>