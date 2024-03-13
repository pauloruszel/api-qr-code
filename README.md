# 🎯 API QR Code
Este é um projeto de API RESTful para geração de QR Codes. Com ele, é possível criar QR Codes personalizados com diferentes tamanhos, cores e opções de download ou visualização.

## Padrões de microserviço utilizados
* Separação em camadas (Controller, Service)
* Injeção de dependências com Spring
* Uso de Record para representação de dados

## ✔️ Tecnologias e bibliotecas usadas
- `Java 17`
- `Spring Boot`
- `Spring WebFlux`
- `Lombok`
- `ZXing`

## Endpoint
### Gerar QR Code

- Método: `GET`

```bash
URL: /api/v1/qrcode?texto={texto}&scale={scale}&foreground={foreground}&background={background}&download={download}&base64={base64}
```
Descrição: Endpoint para gerar um QR Code com as opções especificadas.

Parâmetros

- `texto:` O texto que será codificado no QR Code.
- `scale:` A escala(tamanho) do QR Code.
- `foreground:` A cor do primeiro plano do QR Code.
- `background:` A cor do plano de fundo do QR Code.
- `download:` Opção para download do QR Code (valores possíveis: "true", "false").
- `base64:` Opção para retornar o QR Code em formato base64 (valores possíveis: "true", "false").

### Exemplo de teste
Você pode testar o endpoint com o seguinte payload:
```json
{
  "texto": "https://www.reddit.com",
  "scale": 200,
  "foreground": "#9C27B0",
  "background": "#E1BEE7",
  "download": "false",
  "base64": "false"
}
```

## 🛠️ Execução do projeto
Para executar o projeto, é necessário ter o Java 17 e o Maven instalados.

## 🚀 Como usar
## Clone o repositório:
git clone https://github.com/pauloruszel/api-gen-barcode.git

## 📁 Entre na pasta do projeto:
```bash
cd api-gen-barcode
```
### Execute o comando abaixo para compilar e empacotar o projeto:
```bash
mvn clean package
```
## 🐳 Execute o docker-compose:
```bash
docker-compose up --build
```
A API estará disponível em http://localhost/

## Testes unitários
Para rodar os testes unitários, execute o comando abaixo:
```bash
mvn test
```

## Observações:
A aplicação permite a geração de QR Codes personalizados, incluindo opções para definir o tamanho, as cores do primeiro plano e do fundo, e se a imagem deve ser baixada ou visualizada no navegador. Também é possível retornar a imagem em formato base64.
