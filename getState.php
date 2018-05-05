<?php
$fileName = "input.json";
$file = fopen($fileName, "r");
$json = fread($file, filesize($fileName));
echo($json);
?>