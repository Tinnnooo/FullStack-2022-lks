<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Laravel</title>
</head>
<body>
    <form action="/consultations/{token}" method="post">
        @csrf
        <input type="text" name="disease_history" id="disease_history">
        <input type="text" name="current_symptoms" id="current_symptoms">
        <button type="submit">Submit</button>
    </form>
</body>
</html>
