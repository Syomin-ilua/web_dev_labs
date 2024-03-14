<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Лаба 7</title>
</head>

<body>

    <?

    // СТРОКИ ФУНКЦИИ

    // Задание 1
    $array__str = ["1", 2, "Привет"];
    echo implode(",", $array__str);

    // Задание 2
    $referat = "Солнечное затмение на следующий год, когда было лунное затмение и сгорел древний храм Афины в Афинах (при эфоре Питии и афинском архонте Каллии), недоступно иллюстрирует близкий возмущающий фактор – север вверху, восток слева. В отличие от пылевого и ионного хвостов, метеорный дождь прекрасно выслеживает центральный большой круг небесной сферы, хотя галактику в созвездии Дракона можно назвать карликовой. В отличие от давно известных астрономам планет земной группы, солнечное затмение вызывает первоначальный азимут.
    Ионный хвост, это удалось установить по характеру спектра, неустойчив. Все известные астероиды имеют прямое движение, при этом уравнение времени отражает близкий астероид. Большой круг небесной сферы традиционно перечеркивает межпланетный большой круг небесной сферы. Расстояния планет от Солнца возрастают приблизительно в геометрической прогрессии (правило Тициуса — Боде): г = 0,4 + 0,3 · 2n (а.е.), где возмущающий фактор однородно представляет собой близкий поперечник.
    Спектральный класс неизменяем. Когда речь идет о галактиках, различное расположение меняет непреложный перигей. Даже если учесть разреженный газ, заполняющий пространство между звездами, то все равно исполинская звездная спираль с поперечником в 50 кпк оценивает экваториальный эксцентриситет. Кульминация иллюстрирует поперечник.";
    $mostCommonWord = "поперечник";
    $referatHTML = str_replace("$mostCommonWord", "<mark>$mostCommonWord</mark>", $referat);
    echo $referatHTML;

    // Задание 3
    echo "<br/>";
    echo strip_tags("<h1>Привет мир</h1>");

    // Задание 4
    echo "<br/>";
    $str4 = "Ехал Грека через реку";
    echo stripos($str4, "ре");

    // Задание 5
    echo "<br/>";
    echo strlen("Ехал Грека через реку");

    // Задание 6
    echo "<br/>";
    echo mb_strlen("Ехал Грека через реку", 'UTF-8');

    // Задание 7
    echo "<br/>";
    $str7 = "Ехал Грека через реку";
    echo substr_count($str7, "ре");

    // МАТЕМАТИЧЕСКИЕ ФУНКЦИИ

    // Задание 1
    echo hypot(3, 4);

    // Задание 2
    echo rand(45, 234);

    // Задание 3
    $random_integer = mt_rand(45, 234);
    $random_fraction = mt_rand(0, 999) / 1000;
    $random_number = $random_integer + $random_fraction;
    echo $random_number;

    // php массивы функции

    // Задание 1
    $arr = array(
        "first"=>45, 
        "second"=>76, 
        "third"=>12
    );
    print_r(array_values($arr)); 

    // Задание 2

    print_r(array_keys($arr));

    // Задание 3
    $arr = [45, "тест", 100];
    array_shift($arr);
    print_r($arr);

    // Задание 4
    print_r(array_reverse($arr));

    // Задание 5
    $arr = array(45, 76, 12, 12, 45, 12); 
    print_r(array_unique($arr));
    
    // php include
    include "./menu.inc.php";


    // Задания. Пользовательские функции
    
    // Задания 1 и 2
    echo getPlus10(19);
    function getPlus10($num) {
        return $num + 10;
    }

    // Задания 3
    function pythagoras($x, $y) {
        return sqrt(pow($x, 2) + pow($y, 2));
    }
    echo pythagoras(3, 4);

    // Задание 4 
    function mortgagePayment($loanAmount, $annualInterestRate, $loanTermYears) {
        $monthlyInterestRate = ($annualInterestRate / 12) / 100;
        $loanTermMonths = $loanTermYears * 12;
        $monthlyPayment = $loanAmount * ($monthlyInterestRate * pow(1 + $monthlyInterestRate, $loanTermMonths)) / (pow(1 + $monthlyInterestRate, $loanTermMonths) - 1);
        return $monthlyPayment;
    }
    
    $monthlyPayment = mortgagePayment(2000000, 5, 30);
    echo "Ежемесячный ипотечный платеж: руб." . number_format($monthlyPayment, 2);

    // Задание 5
    echo col(12, 6, 123, 4);
    function col() {
        return func_num_args();
    }

    // Задание 6
    function calculateAverage() {
        $numArgs = func_num_args();
        $sum = 0;
        $count = 0;

        for($i = 0; $i < $numArgs; $i++) {
            $arg = func_get_arg($i);
            if (is_int($arg)) {
                $sum += $arg;
                $count++;
            }
        }

        if ($count > 0) {
            return $sum / $count;
        } else {
            return "Нет целочисленных аргументов";
        }
    }
    echo calculateAverage(15, 21.5, 39);

    // Задание 7
    function drawBarChart() {
        $args = func_get_args();
        $maxValue = max($args);
        $chartHeight = 10;
        foreach ($args as $value) {
            $barHeight = intval(($value / $maxValue) * $chartHeight);
            echo str_repeat("*", $barHeight) . "<br/>";
        }
    }
    drawBarChart(3, 7, 5, 9, 4);

    // Задание 8
    function op($num1, $num2, $operator) {
        switch ($operator) {
            case '+':
                return $num1 + $num2;
            case '-':
                return $num1 - $num2;
            case '*':
                return $num1 * $num2;
            case '/':
                if ($num2 != 0) {
                    return $num1 / $num2;
                } else {
                    return "Деление на ноль невозможно";
                }
            default:
                return "Неверный оператор";
        }
    }
    echo op(1, 2, "+");

    // Задание 9
    function doWorkOnce() {
        static $result;
        if (!isset($result)) {
            $result = "Основная работа выполнена";
        }
        return $result;
    }
    echo doWorkOnce();
    echo doWorkOnce();
    ?>




</body>

</html>