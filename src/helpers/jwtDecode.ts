const decode = (token: string) => {
  // Divida o token em partes: cabeçalho, dados e assinatura
  const [, payload] = token.split('.');
  
  // Decodifique as partes Base64
  const decodedPayload = atob(payload);
  
  // Converta as partes decodificadas em objetos JSON
  const payloadObj = JSON.parse(decodedPayload);
  
  return payloadObj;
}

export default decode;
