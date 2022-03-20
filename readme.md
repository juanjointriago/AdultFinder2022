# para ejecutar el proyecto instale las dependencias de node con el siguiente comando

npm install

# NOTA.(este proyecto no fue creado con yarn sino con npm)


# para correr el proyecto en Android posterior a instalar las dependencias escriba lo siguiente

cd android
./gradlew clean
cd..
npm run android

# para crear un archivo instalable para android escriba lo siguiente

# (para modo debug) 

1
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

2
cd android

3
./gradlew assembleDebug

or directamente sin acceder al directorio android
cd android &&./gradlew assembleDebug

# encontrará el apk en la ruta de android/app/build/outputs/apk/debug/apk-debug.apk

# ojo si desea que se compile en modo producción o release se recomienda hacer unit testing de los componentes y funciones con jest y digitar el siguiente comando

./gradlew assembleDebug

# para subir a la tienda de playstore es necesario generar una llave previo a tener una cuenta de desarrollador en playStore

keytool -genkey -v -keystore your_key_name.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000

# en your_key_name.keystore reempace por el nombre que desee ponerle a su llave para subir a la tienda

# digite el siguiente comando dentro de android/app

mv my-release-key.keystore /android/app

# en su directorio app/build.gradle

android {
....
  signingConfigs {
    release {
        storeFile file('your_key_name.keystore')
        storePassword System.console().readLine("\nKeystore password:")
        keyAlias System.console().readLine("\nAlias: ")
        keyPassword System.console().readLine("\Alias password: ")
    }
  }
  buildTypes {
    release {
      ....
      signingConfig signingConfigs.release
    }
  }
}

# y el siguiente compando

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle 
--assets-dest android/app/src/main/res/


# escriba

cd android
# para windows

gradlew assembleRelease

# para MAC OSX o terminal bash

./gradlew assembleRelease

# si por algún motivo al compilar la app los iconos no aparecen reinstale la libreria de vector-icons dentro del package.json o cualquier otra puede realizar el mismo proceso