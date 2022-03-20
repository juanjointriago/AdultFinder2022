export function emailValidator(email: any) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Email no puede estar vacío!.👻"
  if (!re.test(email)) return 'Ooops! Necesitamos una dirección de email. válida 😶‍🌫️'
  return ''
}

export function nameValidator(name: any) {
  if (!name) return "No puedes dejar tu nombre vacío ...! 😖"
  return ''
}

export function passwordValidator(password: any) {
  if (!password) return "No puedes dejar la contraseña vacía...!😭"
  if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres 🔓😭'
  return ''
}

export function dniValidator(dni: any) {
  if (!dni) return "No puedes dejar la cedula vacía...!😭"
  if (dni.length < 10) return 'La cedula no tiene la cantidad especifica😭'
  return ''
}

export function phoneValidator(phone: any) {
  if (!phone) return "No puedes dejar el nro de telefono vacío...!😭"
  if (phone.length < 10) return 'El número de telefono debe tener 10 digitos😭'
  return ''
}