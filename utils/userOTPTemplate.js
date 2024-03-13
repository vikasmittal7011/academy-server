const template = (OTP_CODE) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="font-sans bg-gray-100">

  <div class="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-semibold mb-4">Your OTP is here!</h1>

    <p class="text-gray-700">Hello,</p>

    <p class="text-gray-700 mb-4">Your One-Time Password (OTP) for authentication is:</p>

    <div class="bg-gray-200 p-4 rounded-md mb-6">
      <h2 class="text-xl font-semibold text-gray-800">${OTP_CODE}</h2>
    </div>

    <p class="text-gray-700 mb-4">This OTP is valid for a short period. Please do not share it with anyone.</p>

    <p class="text-gray-700">Thank you for using our service!</p>
  </div>

</body>
</html>
`;
};

export default template;
