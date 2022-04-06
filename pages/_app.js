import '../styles/style.scss';
import { CarouselContext } from '../context/carouselContext';
import {DialogContext} from '../context/dialogContext'
import Script from 'next/script';


function MyApp({ Component, pageProps }) {
  return (
    <DialogContext>
    <CarouselContext>
      <Component {...pageProps} />
      <Script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"/>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-fQybjgWLrvvRgtW6bFlB7jaZrFsaBXjsOMm/tB9LTS58ONXgqbR9W8oWht/amnpF" crossorigin="anonymous"/>
    </CarouselContext>
  </DialogContext>)
}

export default MyApp
