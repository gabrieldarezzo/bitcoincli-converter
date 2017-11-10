# Bitcoin Converter CLI

> A CLI to convert Bitcoin to any currency provided.

![Example CLI running](docs/example.gif)

### Installing

```
$ npm install -g bitcoincli-converter
```

### How to use

```sh
bitcoincli-converter --help

  Usage: bitcoincli-converter [options]

  Convert Bitcoin to any currency defined

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -C, --currency <currency>  Currency to be converted. (Default: USD)
    -A, --amount <amount>      Value in Bitcoin to convert. (Default: 1)
```

Example of use:

Navigate to Folder: (If you don't install in global ```-g```)
```sh
cd C:\xampp\htdocs\bitcoincli-converter
```

Check:
```sh
bitcoincli-converter
1 BTC to USD = 6841.39
```

Check for currency in BRL (Brazil-Real)
```sh
bitcoincli-converter -C BRL
1 BTC to BRL = 22307.94
```