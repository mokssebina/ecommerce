import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";

import Property from "../components/Property";
import SearchFilters from "../components/SearchFilters";
import { baseUrl, fetchApi } from "../utils/fetchApi";
//import noresult from "../assets/images/noresult.svg";
import RealEstateHeader from "../components/RealEstateHeader";
import Footer from "../components/Footer";


const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  const [menu, setMenu] = useState(true)

  const openNav = () => {
    setMenu(false)
  }

  const closeNav = () => {
    setMenu(true)
  }

  const goToTop = () => {
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  }

  return (
    <div className="h-full w-full mx-auto">
      <Box>
        <Flex
          onClick={() => setSearchFilters(!searchFilters)}
          cursor="pointer"
          bg="gray.100"
          borderBottom="1px"
          borderColor="gray.200"
          p="2"
          fontWeight="black"
          fontSize="lg"
          justifyContent="center"
          alignItems="center"
          align="center"
          justify="center"
        >
          <Text>Search Property By Filters</Text>
          <Icon paddingLeft="2" w="7" as={BsFilter} />
        </Flex>
        {searchFilters && <SearchFilters />}

        <Flex flexWrap="wrap"
          align="center"
          justify="center">   

          <Text fontSize="2xl" p="4" fontWeight="bold">
            Properties {router.query.purpose}
          </Text>
          
        </Flex>
        
        <Flex flexWrap="wrap"
          align="center"
          justify="center">

          {properties.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </Flex>
        {properties.length === 0 && (
          <Flex
            //justifyContent="center"
            //alignItems="center"
            flexDir="column"
            marginTop="5"
            marginBottom="5"
            align="center"
            justify="center"
          >
            {/*<Image src={noresult} alt="noresult" />*/}
            <Text fontSize="xl" marginTop="3">
              No Result Found.
            </Text>
          </Flex>
        )}
      </Box>

    </div>
  );
};

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}

export default Search;