<?php
$file = fopen("input.json", "w");
$json = json_encode($_REQUEST);
fwrite($file, $json);
fclose($file);
echo $json;
?>