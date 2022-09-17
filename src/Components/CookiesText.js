const CookiesText = (props) => {

  // props:
  // website="www.laherraducavinoteca.es"
  // privacyPolicy="www.laherraducavinoteca.es/politica_de_privacidad"
  // email="javierseiglie@gmail.com"

  const olStyle = {
    textAlign: "left",
  };
  const textStyle = {
    textAlign: "justify",
  };
  return (
    <article className="container mb-5">
      <h1 className="my-5">¿Qué son las Cookies?</h1>
      <p style={textStyle}>
        Una Cookie es un fichero que se descarga en su ordenador al entrar a
        determinadas páginas web. Las cookies permiten a una página web, entre
        otras cosas, almacenar y recuperar información sobre sus hábitos de
        navegación y dependiendo de la información que contengan y de la forma
        en que utilice su equipo pueden utilizarse para identificarle.
      </p>
      <h3 className="my-5">Cookies utilizadas en el sitio Web</h3>
      <p style={textStyle}>
        A continuación se clasifican las cookies utilizadas por el sitio{" "}
        {props.website}:
      </p>
      <p style={textStyle}>Según la entidad que las gestiona</p>
      <ul style={olStyle}>
        <li>
          Cookies propias: Son aquellas enviadas y gestionadas directamente por
          el Titular.
        </li>
        <li>
          Cookies de terceros: Son aquellas que se envían al Usuario desde un
          dominio ajeno al Titular. Según su finalidad
        </li>
        <li>
          Cookies técnicas: Son aquellas que permiten a los usuarios registrados
          navegar a través del sitio Web, del área restringida y a utilizar sus
          diferentes funciones, como por ejemplo, el sistema de comentarios o el
          buscador o llevar a cabo el proceso de compra de un Producto o
          Servicio.
        </li>
        <li>
          Cookies de personalización: Son aquellas que permiten a los usuarios
          acceder al Servicio con algunas características de carácter general
          predefinidas en función de una serie de criterios establecidos por el
          Usuario como, por ejemplo, el idioma o el tipo de navegador a través
          del cual se conecta a este sitio Web.
        </li>
        <li>
          Cookies de análisis o medición: Son aquellas que, bien tratadas por el
          sitio Web o por terceros, permiten cuantificar el número de usuarios y
          así realizar la medición y análisis estadístico de la utilización que
          hacen los usuarios del sitio Web. Para ello se analiza la navegación
          que realizas en este sitio Web con el fin de mejorarlo.
        </li>
        <li>
          Cookies sociales: Son establecidas por las plataformas de redes
          sociales para permitir a los usuarios compartir contenido con sus
          amigos y redes.
        </li>
      </ul>
      <p style={textStyle}>Según su duración</p>
      <ul style={olStyle}>
        <li>
          {" "}
          Cookies de sesión: Son aquellas diseñadas para recabar y almacenar
          datos mientras el Usuario accede al sitio Web.
        </li>
        <li>
          Cookies persistentes: Son aquellas en las que los datos siguen
          almacenados en el terminal del Usuario y pueden ser accedidos y
          tratados durante un período definido por el responsable de la cookie.
        </li>
      </ul>
      <p style={textStyle}>
        Listado de cookies utilizadas Este sitio Web puede instalar las siguientes
        </p>
      <ul style={olStyle}>
      cookies: Cookies técnicas
      <li>
        hasConsent: Cookie técnica que almacena el consentimiento del Usuario.
        Es persistente y tiene una duración de 1 año. Cookies de análisis o
        medición
      </li>
      <li>
        {" "}
        _ga: Cookie Analítica que habilita la función de control de visitas
        únicas. Es persistente y tiene una duración de 2 años.{" "}
      </li>
      <li>
        {" "}
        _gat: Cookie Analítica para limitar el número de solicitudes. Su ámbito
        es la sesión y tiene una duración de 1 minuto.
      </li>
      <li>
        {" "}
        _gid: Cookie Analítica para distinguir usuarios. Su ámbito es la sesión
        y tiene una duración de 24 horas.
      </li>
      <li>stripe-*: Cookie necesaria para la plataforma de pago</li>
      </ul>
        <p style={textStyle}>
      Información adicional:
        </p>
      <ul style={olStyle}>
      <li>
        Google Analytics puede instalar otras cookies según el documento Uso de
        las cookies de Google Analytics en sitios web que puede consultar
        <a className="no-deco text-black" href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es">
          en este enlace.
        </a>
      </li>
      </ul>
      <h3 className="my-5">Cookies sociales</h3>
      <p style={textStyle}>
        El sitio Web incluye otras funcionalidades proporcionadas por servicios
        de terceros y redes sociales para mejorar la experiencia de los
        visitantes. Puede compartir el contenido en sus redes sociales como
        Facebook, Twitter, Instagram, Vimeo o YouTube con los botones incluidos
        a tal efecto o con las herramientas para compartir propias de las redes
        sociales. Como resultado, estos servicios pueden instalar cookies y
        utilizarlas para rastrear su actividad online. El Titular no tiene
        control directo sobre la información recopilada por estas cookies.
      </p>
      <h3 className="my-5">El sitio Web puede instalar otras cookies:</h3>
      <ul style={olStyle}>
        <li>_ga</li>
        <li>_fbp</li>
        <li>ocn_accepted</li>
        <li>hubspotutk</li>
        <li>messagesUtk</li>
        <li>yasr_visitor_vote_cookie</li>
        <li>_fbc</li>
        <li>mp_a36067b00a263cce0299cfd960e26ecf_mixpanel</li>
        <li>_gid</li>
        <li>_pk_ref.429638.f37d</li>
        <li>_pk_id.429638.f37d</li>
        <li>__hstc</li>
        <li>__hssrc</li>
        <li>_gat_gtag_EU_XXXXXXXXXX</li>
      </ul>
      <h3 className="my-5">Eliminación de cookies</h3>
      <p style={textStyle}>
        Puede aceptar, bloquear o eliminar las cookies instaladas en su equipo
        mediante la configuración de las opciones del navegador, pero tenga en
        cuenta que parte del sitio no funcionará correctamente o que algunas de
        sus funcionalidades no estarán disponibles o tendrán errores. En los
        siguientes enlaces encontrará instrucciones para habilitar o
        deshabilitar las cookies en los navegadores más comunes.
      </p>
      <ul style={olStyle}>
        <li>
          <a className="no-deco text-black"
            href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias?redirectslug=habilitar-y-deshabilitar-cookies-que-los-sitios-we&redirectlocale=es"
            rel="noopener noreferrer"
          >
            Firefox
          </a>
        </li>
        <li>
          <a className="no-deco text-black"
            href="https://support.google.com/chrome/answer/95647?hl=es"
            rel="noopener noreferrer"
          >
            {" "}
            Google Chrome
          </a>
        </li>
        <li>
          <a className="no-deco text-black"
            href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d#ie=%22ie-10"
            rel="noopener noreferrer"
          >
            Internet Explorer
          </a>
        </li>
        <li>
          <a className="no-deco text-black"
            href="https://support.microsoft.com/es-es/windows/microsoft-edge-datos-de-exploraci%C3%B3n-y-privacidad-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd"
            rel="noopener noreferrer"
          >
            {" "}
            Microsoft Edge
          </a>
        </li>
        <li>
          <a className="no-deco text-black"
            href="https://support.apple.com/es-es/HT201265"
            rel="noopener noreferrer"
          >
            Safari
          </a>
        </li>
      </ul>
      <h3 className="my-5">Tratamiento de Datos Personales</h3>
      <p style={textStyle}>
        El Titular es el Responsable del tratamiento de los datos personales del
        usuario. Puede consultar toda la información relativa al tratamiento de
        datos personales que recoge el Titular en la página de la:{" "}
        {props.privacyPolicy}.
      </p>
      <h3 className="my-5">Contacto:</h3>
      <p style={textStyle}>
        En caso de que tenga cualquier duda acerca de esta Política de Cookies o
        quiera realizar cualquier comentario sobre este sitio Web, puede enviar
        un mensaje a la dirección de correo electrónico: {props.email}
      </p>
    </article>
  );
};

export default CookiesText;
