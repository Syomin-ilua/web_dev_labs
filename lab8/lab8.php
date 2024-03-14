<?php


try {
    $db = new PDO('mysql:host=localhost;dbname=labs', "root", "root");
} catch (PDOException $e) {
    echo "Произошла ошибка подключения к БД!";
}



?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Лаба 8</title>
</head>
<style>

</style>

<body>

    <?php
    $queryAnalysis = "SELECT * FROM Analysis";
    $resultAnalysis = $db->prepare($queryAnalysis);
    if ($resultAnalysis->execute()) {
        if ($resultAnalysis->rowCount() > 0) {
            $analysis = $resultAnalysis->fetchAll(PDO::FETCH_ASSOC);
            echo "<table>
                    <thead>
                        <tr>
                            <th>ID анализа</th>
                            <th>Название анализа</th>
                            <th>Себестоимость анализа</th>
                            <th>Розничная цена анализа</th>
                            <th>Группа анализов</th>
                        </tr>
                    </thead>
                    <tbody>";
            foreach ($analysis as $analys) {
                echo "
                      <tr>
                        <td>" . $analys['an_id'] . "</td>
                        <td>" . $analys['an_name'] . "</td>
                        <td>" . $analys['an_cost'] . "</td>
                        <td>" . $analys['an_price'] . "</td>
                        <td>" . $analys['an_group'] . "</td>
                      </tr>
                    ";
            }
            echo "</tbody>
                </table>";
        } else {
            echo "<p>Вот такие пироги, дорогие друзья! В этой таблице нихрена нет!</p>";
        }
    } else {
        echo "<p>Ошибки на сервере!</p>";
    }
    ?>

    <?php
    $queryGroups = "SELECT * FROM Groups";
    $resultGroups = $db->prepare($queryGroups);
    if ($resultGroups->execute()) {
        if ($resultGroups->rowCount() > 0) {
            $groups = $resultGroups->fetchAll(PDO::FETCH_ASSOC);
            echo "<table>
                    <thead>
                        <tr>
                            <th>ID группы</th>
                            <th>Название группы</th>
                            <th>Температурный режим хранения</th>
                        </tr>
                    </thead>
                    <tbody>";
            foreach ($groups as $group) {
                echo "
                      <tr>
                        <td>" . $group['gr_id'] . "</td>
                        <td>" . $group['gr_name'] . "</td>
                        <td>" . $group['gr_temp'] . "</td>
                      </tr>
                    ";
            }
            echo "</tbody>
                </table>";
        } else {
            echo "<p>Вот такие пироги, дорогие друзья! В этой таблице нихрена нет!</p>";
        }
    } else {
        echo "<p>Ошибки на сервере!</p>";
    }
    ?>

    <?php
    $queryOrders = "SELECT * FROM Orders";
    $resultOrders = $db->prepare($queryOrders);
    if ($resultOrders->execute()) {
        if ($resultOrders->rowCount() > 0) {
            $orders = $resultOrders->fetchAll(PDO::FETCH_ASSOC);
            echo "<table>
                    <thead>
                        <tr>
                            <th>ID анализа</th>
                            <th>Название анализа</th>
                            <th>Себестоимость анализа</th>
                        </tr>
                    </thead>
                    <tbody>";
            foreach ($orders as $order) {
                echo "
                      <tr>
                        <td>" . $order['ord_id'] . "</td>
                        <td>" . $order['ord_datetime'] . "</td>
                        <td>" . $order['ord_an'] . "</td>
                      </tr>
                    ";
            }
            echo "</tbody>
                </table>";
        } else {
            echo "<p>Вот такие пироги, дорогие друзья! В этой таблице нихрена нет!</p>";
        }
    } else {
        echo "<p>Ошибки на сервере!</p>";
    }
    ?>

</body>

</html>