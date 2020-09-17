import React from 'react';

const NearbyOrganizations = () => {
    return (
        <div className="w-full bg-white rounded-lg border">
            <div className="flex flex-row px-4 pt-4 pb-2">
                <div className="flex flex-1 items-center">
                    <p className="text-sm">
                        Nearby Organisations
                    </p>
                </div>

                <div className="flex flex-1 justify-end items-center">
                    <span>
                        <i class="fas fa-sliders-h"></i>
                    </span>
                </div>
            </div>

            
        </div>
    )
}

export default NearbyOrganizations;