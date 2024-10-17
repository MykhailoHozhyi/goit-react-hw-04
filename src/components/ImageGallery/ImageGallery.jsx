import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ gallery }) {
  return (
    <ul>
      {gallery.map(image => (
        <li key={image.id}>
          <ImageCard src={image.urls.small} alt={image.description} />
        </li>
      ))}
    </ul>
  );
}
