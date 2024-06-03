let count = 0;
export function hidePhotos() {
    if (document.URL.includes('listing')&& count<50) {
        const listingInspectionPhotosSection = document.querySelector<HTMLElement>("#inspect-photos-section") ;
    if (!listingInspectionPhotosSection ) {
      setTimeout(() => {
        count= count+1
        hidePhotos();
      }, 300);
    } else {
        listingInspectionPhotosSection.style.display = 'none';
    }
    }  
  }