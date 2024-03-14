<?php
$products = [
    [
        'name' => 'Ноутбук',
        'price' => 1000,
        'description' => 'Мощный ноутбук с высокой производительностью.'
    ],
    [
        'name' => 'Смартфон',
        'price' => 500,
        'description' => 'Современный смартфон с большим экраном и камерой высокого разрешения.'
    ],
    [
        'name' => 'Планшет',
        'price' => 700,
        'description' => 'Легкий и компактный планшет для работы и развлечений.'
    ]
];

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Магазин</title>
</head>

<body>

    <?
        foreach ($products as $product) {
            include 'goods.php';
        }
    ?>



</body>

</html>