<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Лаба 6</title>
</head>

<body>

    <?
    // Основы

    // 1 задание 
    // echo phpinfo();

    // 2 задание 
    // echo "привет";

    // Задание 3
    // echo date('d-m-Y H:i:s');

    // Задание 4
    // $htmllab = "ru";
    // echo $htmllab;

    // Задание 5
    // const NPP = 10;
    // echo NPP;

    // Задание 6
    // $num1 = 23;
    // $num2 = 67;
    // echo $num1 + $num2;

    // Задание 7
    // $test = (int) 345;
    // echo gettype($test);

    // Задание 8
    // $test1 = (string) $test;

    // Задание 9
    // echo "103" + 2;

    // Условные операторы

    // Задание 1

    // $a = 0;
    // if($a >= 0) {
    //     echo "Число положительно!";
    // } else {
    //     echo "Число отрицательно!";
    // }

    // Задание 2

    // $b = 3;
    // if($b % 2 == 0) {
    //     echo "Число чётное!";
    // } else {
    //     echo "Число не чётное!";
    // }

    // Задание 3
    // $c = 18;
    // if($c >= 18) {
    //     echo "Вы совершеннолетний!";
    // } else {
    //     echo "Вы несовершеннолетний!";
    // }

    // Задание 4
    // $d = 18;
    // if($c % 3 == 0 || $c % 5 == 0 || $c % 7 == 0) {
    //     echo "кратно!";
    // } else {
    //     echo "не кратно!";
    // }

    // Задание 5
    // $e = 2024;
    // if($e % 4 === 0) {
    //     echo "Год был весокосным!";
    // } else {
    //     echo "Год был не весокосным!";
    // }

    // Циклы (реализовать при помощи while и for)

    // for($i = 0; $i <= 100; $i++) {
    //     echo $i . "<br/>";
    // }

    // $b = 0;

    // while($b <= 100) {
    //     echo $b . "<br/>";
    //     $b++;
    // }

    // for ($i = 23; $i <= 78; $i++) {
    //     echo $i . "<br/>";
    // }

    // $b = 23;

    // while($b <= 78) {
    //     echo $b . "<br/>";
    //     $b++;
    // }

    ?>

    <ul>
        <?
        for ($i = 0; $i <= 10; $i++) {
            echo "<li>$i</li>";
        }
        ?>
    </ul>

    <?
    // $rand_array = [];

    // for($i = 0; $i <= 100; $i++) {
    //     array_push($rand_array, rand(1, 100));
    // }

    // $i = 0;

    // while($i <= count($rand_array)) {
    //     echo $rand_array[$i] . "<br/>";
    //     $i++;
    // }

    // foreach ($rand_array as $value) {
    //     echo $value . "<br/>";
    // }

    ?>
    <div>
        <!-- <?
                $str_array = ["asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd", "asdasd"];
                foreach ($str_array as $value) {
                    echo $value . "<br/>";
                }
                ?> -->
    </div>


    <?
    $products__array = [
        "1" => [
            "title" => "Продукт 1",
            "description" => "Описание продукта 1",
            "price" => 100
        ],
        "2" => [
            "title" => "Продукт 2",
            "description" => "Описание продукта 2",
            "price" => 200
        ],
        "3" => [
            "title" => "Продукт 3",
            "description" => "Описание продукта 3",
            "price" => 300
        ],
        "4" => [
            "title" => "Продукт 4",
            "description" => "Описание продукта 4",
            "price" => 400
        ]
    ];

    ?>
    

    <div>
        <?
            foreach ($products__array as $key => $value) {
                echo "
                    <div>
                        <h2>$value[title]</h2>
                        <p>$value[description]</p>
                        <a href='$key'>$value[price]</a>
                    </div>
                ";
            }
        ?>
    </div>

   <?
        $array__rand = [];

        for($i = 0; $i <= 50; $i++) {
            array_push($array__rand, rand(0, 100));
        }

        $result__array = [];

        foreach($array__rand as $value) {
            if($value < 72) {
                array_push($result__array, $value);
            }
        }

        print_r($result__array);
   ?>

   <div>
        <?
            for($i = 1; $i <= 100; $i++) {
                if($i % 2 == 0) {
                    echo "<div style='background-color: gray; height: 40px; width: 100%;'>$i</div>";
                    continue;
                }
                echo "<div style='height: 40px; width: 100%;'>$i</div>";
            }
        ?>
   </div>

</body>

</html>