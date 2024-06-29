/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async';

export default function MetaData({ title }) {
  return (
    <Helmet>
      <title>{`${title} - Grand India`}</title>
    </Helmet>
  );
}
