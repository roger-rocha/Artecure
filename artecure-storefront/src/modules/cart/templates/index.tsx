"use client"

import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import DiscountCode from "@modules/checkout/components/discount-code"
import SkeletonCartPage from "@modules/skeletons/templates/skeleton-cart-page"
import { useCart, useMeCustomer } from "medusa-react"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import ItemsTemplate from "./items"
import Summary from "./summary"
import Link from "next/link";
import Button from "@modules/common/components/button";

const CartTemplate = () => {
  const { cart } = useCart()
  const { customer, isLoading } = useMeCustomer()
  const items = useEnrichedLineItems()

  if (!cart || !cart?.id?.length || isLoading) {
    return <SkeletonCartPage />
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="content-container">
        {cart.items.length ? (
          <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-8">
            <div className="flex flex-col bg-white p-6 gap-y-6">
              {!customer &&
                  <div className="bg-white p-4 flex items-start justify-between">
                <div>
                  <h2 className="text-xl-semi">Already have an account?</h2>
                  <p className="text-base-regular text-gray-700 mt-2">
                    Sign in for a better experience.
                  </p>
                </div>
                <div>
                  <Link href="/account/login">
                    <Button variant="secondary">Sign in</Button>
                  </Link>
                </div>
              </div>}
              <ItemsTemplate region={cart?.region} items={items} />
            </div>
            <div className="relative">
              <div className="flex flex-col gap-y-8 sticky top-12">
                {cart && cart.region && (
                  <>
                    <div className="bg-white p-6">
                      <Summary cart={cart} />
                    </div>
                    <div className="bg-white p-6">
                      <DiscountCode cart={cart} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {!customer && <SignInPrompt />}
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
