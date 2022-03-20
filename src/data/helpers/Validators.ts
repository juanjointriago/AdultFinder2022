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
  if (password.length < 5) return 'La contraseña debe tener al menos 8 caracteres 🔓😭'
  return ''
}