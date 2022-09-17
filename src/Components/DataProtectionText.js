import React from "react";
import PropTypes from "prop-types";

const DataProtectionText = (props) => {
  // props
  // companyName={"La Herradura Vinoteca"}
  // website={"https://www.laherraduravinoteca.es"}
  // email={"javierseiglie@gmail.com"}
  // address={"Paseo de Extremadura 117, 28011. Madrid, España."}
  // owner={"Marta Albasanz Herrero"}
  // ownerAddress={"P° de Extremadura 117"}
  // ownerDNI={"51683810G"}
  // DataProteccionURL={
  //   "https://www.laherraduravinoteca.es/politica_de_privacidad"

  const olStyle = {
    textAlign: "left",
  };
  const ulStyle = {
    listStyle: "none",
  };
  const textStyle = {
    textAlign: "justify",
  };
  return (
    <article className="container mb-5">
      <h1 className="my-5">
        Protección de datos de carácter personal según la LOPDDD{" "}
        {props.companyName}
      </h1>
      <p style={textStyle}>
        {props.companyName}, en aplicación de la normativa vigente en materia de
        protección de datos de carácter personal, informa que los datos
        personales que se recogen a través de los formularios del Sitio web:{" "}
        {props.website}, se incluyen en los ficheros automatizados específicos
        de usuarios de los servicios de {props.companyName}
      </p>
      <p style={textStyle}>
        La recogida y tratamiento automatizado de los datos de carácter personal
        tiene como finalidad el mantenimiento de la relación comercial y el
        desempeño de tareas de información, formación, asesoramiento y otras
        actividades propias de {props.companyName}. Estos datos únicamente serán
        cedidos a aquellas entidades que sean necesarias con el único objetivo
        de dar cumplimiento a la finalidad anteriormente expuesta.
      </p>
      <p style={textStyle}>
        {props.companyName} adopta las medidas necesarias para garantizar la
        seguridad, integridad y confidencialidad de los datos conforme a lo
        dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del
        Consejo, de 27 de abril de 2016, relativo a la protección de las
        personas físicas en lo que respecta al tratamiento de datos personales y
        a la libre circulación de los mismos. El usuario podrá en cualquier
        momento ejercitar los derechos de acceso, oposición, rectificación y
        cancelación reconocidos en el citado Reglamento (UE). El ejercicio de
        estos derechos puede realizarlo el propio usuario a través de email a:{" "}
        {props.email} o en la dirección: {props.address}. El usuario manifiesta
        que todos los datos facilitados por él son ciertos y correctos, y se
        compromete a mantenerlos actualizados, comunicando los cambios a{" "}
        {props.email}. Finalidad del tratamiento de los datos personales: ¿Con
        qué finalidad trataremos tus datos personales? En {props.companyName},
        trataremos tus datos personales recabados a través del Sitio Web:{" "}
        <a className="no-deco text-black" href={props.website}>
          {props.website},
        </a>{" "}
        con las siguientes finalidades:{" "}
      </p>
      <ol style={olStyle}>
        <li>
          En caso de contratación de los bienes y servicios ofertados a través
          de {props.companyName}, para mantener la relación contractual, así
          como la gestión, administración, información, prestación y mejora del
          servicio.
        </li>{" "}
        <li>
          Envío de información solicitada a través de los formularios dispuestos
          en {props.website}{" "}
        </li>
        <li>
          Remitir boletines (newsletters), así como comunicaciones comerciales
          de promociones y/o publicidad de {props.companyName} y del sector.
        </li>
      </ol>
      <p style={textStyle}>
        Te recordamos que puedes oponerte al envío de comunicaciones comerciales
        por cualquier vía y en cualquier momento, remitiendo un correo
        electrónico a la dirección indicada anteriormente. Los campos de dichos
        registros son de cumplimentación obligatoria, siendo imposible realizar
        las finalidades expresadas si no se aportan esos datos. ¿Por cuánto
        tiempo se conservan los datos personales recabados? Los datos personales
        proporcionados se conservarán mientras se mantenga la relación comercial
        o no solicites su supresión y durante el plazo por el cuál pudieran
        derivarse responsabilidades legales por los servicios prestados.
        Legitimación: El tratamiento de tus datos se realiza con las siguientes
        bases jurídicas que legitiman el mismo: 1. La solicitud de información
        y/o la contratación de los servicios de {props.companyName}, cuyos
        términos y condiciones se pondrán a tu disposición en todo caso, de
        forma previa a una eventual contratación. 2. El consentimiento libre,
        específico, informado e inequívoco, en tanto que te informamos poniendo
        a tu disposición la presente política de privacidad, que tras la lectura
        de la misma, en caso de estar conforme, puedes aceptar mediante una
        declaración o una clara acción afirmativa, como el marcado de una
        casilla dispuesta al efecto. En caso de que no nos facilites tus datos o
        lo hagas de forma errónea o incompleta, no podremos atender tu
        solicitud, resultando del todo imposible proporcionarte la información
        solicitada o llevar a cabo la contratación de los servicios.
        Destinatarios: Los datos no se comunicarán a ningún tercero ajeno a{" "}
        {props.companyName}, salvo obligación legal. Como encargados de
        tratamiento, tenemos contratados a los siguientes proveedores de
        servicios, habiéndose comprometido al cumplimiento de las disposiciones
        normativas, de aplicación en materia de protección de datos, en el
        momento de su contratación:
        <ul>
          <li>Encargado: {props.owner},</li>
          <li>con domicilio en {props.ownerAddress},</li>
          <li>NIF/CIF nº {props.ownerDNI}, </li>{" "}
          <li>presta servicios de {props.companyName}. </li>{" "}
          <li>
            Puede consultar la política de privacidad y demás aspectos legales
            de la compañía en el siguiente enlace:{" "}
            <a className="no-deco text-black" href={props.privacyUrl}>
              {props.privacyUrl}
            </a>
          </li>
        </ul>
      </p>
      <p style={textStyle}>
        En los casos en que el usuario incluya ficheros con datos de carácter
        personal en los servidores de alojamiento compartido,{" "}
        {props.companyName} no se hace responsable del incumplimiento por parte
        del usuario del RGPD. Retención de datos en conformidad a la LSSI{" "}
        {props.companyName} informa de que, como prestador de servicio de
        alojamiento de datos y en virtud de lo establecido en la Ley 34/2002 de
        11 de julio de Servicios de la Sociedad de la Información y de Comercio
        Electrónico (LSSI), retiene por un periodo máximo de 12 meses la
        información imprescindible para identificar el origen de los datos
        alojados y el momento en que se inició la prestación del servicio. La
        retención de estos datos no afecta al secreto de las comunicaciones y
        sólo podrán ser utilizados en el marco de una investigación criminal o
        para la salvaguardia de la seguridad pública, poniéndose a disposición
        de los jueces y/o tribunales o del Ministerio que así los requiera. La
        comunicación de datos a las Fuerzas y Cuerpos del Estado se hará en
        virtud a lo dispuesto en la normativa sobre protección de datos
        personales.
      </p>
      <h3 className="my-5">Derechos de propiedad intelectual</h3>
      <p style={textStyle}>
        {props.owner}. {props.owner} es titular de todos los derechos de autor,
        propiedad intelectual, industrial, “know how” y cuantos otros derechos
        guardan relación con los contenidos del sitio web {props.website} y los
        servicios ofertados en el mismo, así como de los programas necesarios
        para su implementación y la información relacionada. No se permite la
        reproducción, publicación y/o uso no estrictamente privado de los
        contenidos, totales o parciales, del sitio web {props.website} sin el
        consentimiento previo y por escrito. Propiedad intelectual del software
        El usuario debe respetar los programas de terceros puestos a su
        disposición por {props.companyName}, aun siendo gratuitos y/o de
        disposición pública. {props.companyName} dispone de los derechos de
        explotación y propiedad intelectual necesarios del software.
      </p>
      <p style={textStyle}>
        El usuario no adquiere derecho alguno o licencia por el servicio
        contratado, sobre el software necesario para la prestación del servicio,
        ni tampoco sobre la información técnica de seguimiento del servicio,
        excepción hecha de los derechos y licencias necesarios para el
        cumplimiento de los servicios contratados y únicamente durante la
        duración de los mismos. Para toda actuación que exceda del cumplimiento
        del contrato, el usuario necesitará autorización por escrito por parte
        de
        {props.owner}, quedando prohibido al usuario acceder, modificar,
        visualizar la configuración, estructura y ficheros de los servidores
        propiedad de {props.owner}, asumiendo la responsabilidad civil y penal
        derivada de cualquier incidencia que se pudiera producir en los
        servidores y sistemas de seguridad como consecuencia directa de una
        actuación negligente o maliciosa por su parte. Propiedad intelectual de
        los contenidos alojados Se prohíbe el uso contrario a la legislación
        sobre propiedad intelectual de los servicios prestados por{" "}
        {props.companyName} y, en particular de:
        <ul>
          <li>
            La utilización que resulte contraria a las leyes españolas o que
            infrinja los derechos de terceros.
          </li>
          <li>
            La publicación o la transmisión de cualquier contenido que, a juicio
            de {props.companyName}, resulte violento, obsceno, abusivo, ilegal,
            racial, xenófobo o difamatorio.
          </li>
          <li>
            Los cracks, números de serie de programas o cualquier otro contenido
            que vulnere derechos de la propiedad intelectual de terceros.
          </li>
          <li>
            La recogida y/o utilización de datos personales de otros usuarios
            sin su consentimiento expreso o contraviniendo lo dispuesto en
            Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27
            de abril de 2016, relativo a la protección de las personas físicas
            en lo que respecta al tratamiento de datos personales y a la libre
            circulación de los mismos.
          </li>
          <li>
            La utilización del servidor de correo del dominio y de las
            direcciones de correo electrónico para el envío de correo masivo no
            deseado.
          </li>
        </ul>
      </p>
      <p style={textStyle}>
        El usuario tiene toda la responsabilidad sobre el contenido de su web,
        la información transmitida y almacenada, los enlaces de hipertexto, las
        reivindicaciones de terceros y las acciones legales en referencia a
        propiedad intelectual, Derechos de terceros y protección de menores. El
        usuario es responsable respecto a las leyes y reglamentos en vigor y las
        reglas que tienen que ver con el funcionamiento del servicio online,
        comercio electrónico, derechos de autor, mantenimiento del orden
        público, así como principios universales de uso de Internet.
      </p>
      <p style={textStyle}>
        El usuario indemnizará a {props.owner} por los gastos que generara la
        imputación de {props.companyName} en alguna causa cuya responsabilidad
        fuera atribuible al usuario, incluidos honorarios y gastos de defensa
        jurídica, incluso en el caso de una decisión judicial no definitiva.
        Protección de la información alojada
        {props.companyName} realiza copias de seguridad de los contenidos
        alojados en sus servidores, sin embargo no se responsabiliza de la
        pérdida o el borrado accidental de los datos por parte de los usuarios.
        De igual manera, no garantiza la reposición total de los datos borrados
        por los usuarios, ya que los citados datos podrían haber sido suprimidos
        y/o modificados durante el periodo del tiempo transcurrido desde la
        última copia de seguridad. Los servicios ofertados, excepto los
        servicios específicos de backup, no incluyen la reposición de los
        contenidos conservados en las copias de seguridad realizadas por{" "}
        {props.companyName}, cuando esta pérdida sea imputable al usuario; en
        este caso, se determinará una tarifa acorde a la complejidad y volumen
        de la recuperación, siempre previa aceptación del usuario. La reposición
        de datos borrados sólo está incluida en el precio del servicio cuando la
        pérdida del contenido sea debida a causas atribuibles a{" "}
        {props.companyName}
        Comunicaciones comerciales En aplicación de la LSSI. {props.companyName}
        no enviará comunicaciones publicitarias o promocionales por correo
        electrónico u otro medio de comunicación electrónica equivalente que
        previamente no hubieran sido solicitadas o expresamente autorizadas por
        los destinatarios de las mismas. En el caso de usuarios con los que
        exista una relación contractual previa, {props.companyName} sí está
        autorizado al envío de comunicaciones comerciales referentes a productos
        o servicios de {props.companyName} que sean similares a los que
        inicialmente fueron objeto de contratación con el cliente. En todo caso,
        el usuario, tras acreditar su identidad, podrá solicitar que no se le
        haga llegar más información comercial a través de los canales de
        Atención al Cliente.
      </p>
    </article>
  );
};

DataProtectionText.propTypes = {
  companyName: PropTypes.string,
  website: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.string,
  owner: PropTypes.string,
  ownerAddress: PropTypes.string,
  ownerDNI: PropTypes.string,
  privacyUrl: PropTypes.string,
};

export default DataProtectionText;