import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  VStack,
  Stack,
  Container,
  Box,
  IconButton,
  Button,
  useColorMode,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react"
import NavMenu from "./navigation-menu"
import { FiX, FiChevronDown } from "react-icons/fi"
import getNavLinks from "../utils/get-nav-links"

const NavDrawer = ({
  isOpen,
  onClose,
  navContainerStyles,
  mainNavigationLinks,
}) => {
  const data = useStaticQuery(graphql`
    {
      prismicNavigation {
        data {
          nav {
            ... on PrismicNavigationNavNavItem {
              primary {
                primary_link_label
              }
              items {
                sub_link_label {
                  document {
                    ... on PrismicTag {
                      ...TagInfo
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  const {
    prismicNavigation: {
      data: { nav: navigationItems },
    },
  } = data

  const navLinks = getNavLinks(navigationItems)

  const size = useBreakpointValue({
    base: "full",
    md: "xs",
  })
  const { colorMode } = useColorMode()
  const [isDesktop] = useMediaQuery("(min-width: 48em)")

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="top"
      size={size}
      allowPinchZoom
    >
      <DrawerOverlay>
        <DrawerContent>
          {!isDesktop && (
            <Container
              {...navContainerStyles}
              display="inline-flex"
              flexDir="row-reverse"
            >
              <IconButton
                aria-label="أغلق التنقل الثانوي"
                colorScheme="white"
                size="sm"
                icon={<FiX color={colorMode === "dark" ? "white" : "black"} />}
                onClick={onClose}
              />
            </Container>
          )}
          <DrawerBody py={5}>
            <Box overflowY="auto" display="flex" flexDir="column" h="full">
              {!isDesktop && (
                <VStack spacing={10} mb={10}>
                  {mainNavigationLinks.map((item, index) => (
                    <Box
                      as={Link}
                      to={item.dest}
                      key={item.name + index}
                      fontSize="xl"
                      fontWeight="900"
                    >
                      {item.name}
                    </Box>
                  ))}
                </VStack>
              )}
              <Stack
                spacing={[8, null, 16]}
                mb={[10, null, 0]}
                direction={["column", null, "row"]}
                align="center"
                justify="center"
              >
                {isDesktop
                  ? navLinks.map((item, index) => {
                      const { name, dest, subLinks } = item

                      const navButtonStyles = {
                        backgroundColor: "white",
                        _focus: {
                          boxShadow: "none",
                          backgroundColor: "gray.200",
                        },
                        _hover: {
                          backgroundColor: "gray.200",
                        },
                        color: "black",
                      }

                      return subLinks?.length === 0 ? (
                        <Button
                          aria-label="SubLink"
                          as={Link}
                          to={`/${dest}`}
                          {...navButtonStyles}
                          key={item.name + index}
                        >
                          {name}
                        </Button>
                      ) : (
                        <React.Fragment key={item.name + index}>
                          <NavMenu
                            menuButtonStyles={navButtonStyles}
                            menuButtonText={name}
                            menuMainItem={{ name, dest }}
                            menuItems={subLinks}
                            menuItemsPrefix="/podcast"
                            rightIcon={<FiChevronDown color="black" />}
                          />
                        </React.Fragment>
                      )
                    })
                  : navLinks.map((item, index) => (
                      <Box
                        as={Link}
                        to={`/${item.dest}`}
                        fontSize="md"
                        fontWeight="600"
                        key={item.name + index}
                      >
                        {item.name}
                      </Box>
                    ))}
              </Stack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

NavDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  navContainerStyles: PropTypes.object.isRequired,
  mainNavigationLinks: PropTypes.array.isRequired,
}

export default NavDrawer
